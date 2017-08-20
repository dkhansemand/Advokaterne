<?php

class Router{

    protected $uri;

    protected $controller;

    protected $params = [];

    protected $route;

    protected $method_prefix;

    protected $action;

    /**
     * @return mixed
     */
    public function getUri()
    {
        return $this->uri;
    }

    /**
     * @return mixed
     */
    public function getController()
    {
        return $this->controller;
    }

    /**
     * @return mixed
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * @return mixed
     */
    public function getRoute()
    {
        return $this->route;
    }

    /**
     * @return mixed
     */
    public function getMethodPrefix()
    {
        return $this->method_prefix;
    }

    public function getAction(){
        return $this->action;
    }

    public function __construct($uri, $routes){
        $this->uri = urldecode(trim($uri, '/'));

        $uri_parts = explode('?', $uri);

        // Get path like /lng/controller/action/param1/param2/.../...
        $path = $uri_parts[0];
        $path_parts = explode('/', explode('.php', $path)[1]);
        if(count($path_parts)){
            $this->route = array_splice($path_parts, 1);
            $this->controller = isset($this->route[0]) ? strtolower($this->route[0]) : null;
            $this->method_prefix = isset($this->route[1]) ? strtolower($this->route[1]) : null;
            $this->action = isset($this->route[2]) ? strtolower($this->route[2]) : null;
            $this->params = array_slice($this->route, -1, count($this->route) - 3);
        }
        
    }

}