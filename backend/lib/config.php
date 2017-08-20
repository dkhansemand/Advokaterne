<?php

    header('Content-Type: text/json');
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype, Access-Control-Allow-Credentials');
	header("Access-Control-Allow-Credentials: true");
    define('__DB_HOST__','localhost');
	define('__DB_USERNAME__', 'root');
	define('__DB_PASSWORD__', '');
	define('__DB_NAME__', 'advokaterne');
    define('_LOG_PATH_', dirname(__DIR__) . DS .'log' . DS);

    ## Auto class loader from folder './lib/Classes'
    ## Class autoloader
	function classLoader($className){
		$className = str_replace('\\', '/', $className);
		if(file_exists(__DIR__ . DS . $className . '.class.php')){
			require_once __DIR__ . DS . $className . '.class.php';
		} else {
			echo 'ERROR: '. __DIR__ . DS. $className . '.class.php';
		}
	}
	spl_autoload_register('classLoader');

    