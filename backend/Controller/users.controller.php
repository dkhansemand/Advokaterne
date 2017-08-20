<?php

class userscontroller {

    public function verify_login($data){
        if(!empty($data['username']) && !empty($data['password'])){
            $username = $data['username'];
            $password = $data['password'];
            if($username == 'admin@admin.dk' && $password == '1234'){
                $token = sha1($username);
                return ['err'=> false, 'data' => ['username' => $username, 'token' => $token]];
            }else{
                return ['err' => true, 'data' => 'Forkert e-mail eller password'];
            }
        }
        return false;
    }
}