<?php
    class homecontroller {

        public function __construct(){
            return 'HomeController';
        }

        public function services_list($param = '', $param2){
            return ['test', 'test2', 'test3'];
        }

        public function get_index(){
            return ['err' => false, 'data' => 'index list'];
        }

        public function post_index($postData){
            return ['err' => false, 'data' => $postData];
        }
    }