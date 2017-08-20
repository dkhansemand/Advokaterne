<?php
    define('DS', DIRECTORY_SEPARATOR);
    define('ROOT', __DIR__ . DS);

    require_once ROOT.DS.'lib'.DS.'config.php';

    $filter = new Filter();
    $router = new Router($_SERVER['REQUEST_URI'], null);
    if($filter->checkMethod('GET')){
        $GET = $filter->sanitizeArray(INPUT_GET);
    }
    if($filter->checkMethod('POST')){
        $POST = $filter->sanitizeArray(INPUT_POST);
    }
    //var_dump($GET);
    //
    //var_dump($POST);
    if(!empty($router->getRoute())){
        $returnData = ['URI' => $router->getUri(), 'params' => $router->getParams(), 'Controller' => $router->getController(), 'Route' => $router->getRoute(), 'prefix' => $router->getMethodPrefix() ];
        //print_r($returnData);
        if(file_exists('./Controller/' . $router->getController() . '.controller.php')){
            require_once './Controller/'.$router->getController().'.controller.php';
            $controllerClass = $router->getController() . 'controller';
            $controller = new $controllerClass();
            $func = $router->getMethodPrefix() . '_' . $router->getAction();
            if(method_exists($controller, $func)){
                //var_dump(call_user_func(array($controllerClass, $func)));
                $reflection = new ReflectionClass($controller);
                $getMethod = $reflection->getMethod($func);
                $needParam = $getMethod->getParameters();
                $paramCount = $getMethod->getNumberOfParameters();
                if(empty($router->getParams()) && $paramCount == 0){
                    $returnData = call_user_func(array($controller, $func));
                }else{
                    //echo $func .' needs params int(' . $needParam . ')';
                    if($filter->checkMethod('GET')){
                        if(count($router->getParams()) == $paramCount){
                            $returnData = call_user_func_array(array($controller, $func), $router->getParams());
                        }else{
                            //Error state
                            $params = '';
                            foreach($needParam as $param){
                                $params .= $param . ', ';
                            }
                            $returnData = ['err' => true, 'data' => $func .' needs params (' . $params . ')'];
                        }
                    }elseif($filter->checkMethod('POST')){
                        $returnData = call_user_func_array(array($controller, $func), array($POST));
                    }
                }
            }else{
                $returnData = ['err' => true, 'data' => 'Cannot find requested method : ' . $router->getMethodPrefix() .'_'.$router->getAction()];
            }
            //var_dump($controller);
        }else{
            $returnData = ['err' => true, 'data' => 'Cannot get requested controller : ' . $router->getController()];
        }

    }else{
        $returnData = ['err' => true, 'data' => 'Cannot get requested endpoint /'];
    }


    echo json_encode($returnData);
