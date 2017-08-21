<?php

class userscontroller extends DB {

    public function __construct(){
        parent::__construct();
    }

    public function verify_login($data){
        if(!empty($data['username']) && !empty($data['password'])){
            $username = $data['username'];
            $password = $data['password'];
            /*
            if($username == 'admin@admin.dk' && $password == '1234'){
                $token = sha1($username);
                $secret = serialize(['username' => $username]);
                return ['err'=> false, 'data' => ['username' => $username, 'token' => $token]];
            }else{
                return ['err' => true, 'data' => 'Forkert e-mail eller password'];
            } */
            /*$options  = array('cost' => 12);
            $hash     = password_hash('1234', PASSWORD_BCRYPT, $options);*/
    
            $queryUser = $this->prepQuery("SELECT userId, userEmail, username, userPassword,
                                        roleName, roleLevel
                                        FROM users 
                                        INNER JOIN userRoles ON userRole = roleId 
                                        WHERE userEmail = :EMAIL OR username = :EMAIL");
            $queryUser->bindParam(':EMAIL', $username, \PDO::PARAM_STR);
            if($queryUser->execute() & ($queryUser->rowCount() === 1)){
                $user = $queryUser->fetch(\PDO::FETCH_OBJ);
                if(($user->userEmail === $username || $user->username === $username) && password_verify($password, $user->userPassword)){
                    
                    $token = base64_encode(json_encode(['userId' => $user->userId, 'username' => $user->username, 'role' => $user->roleLevel]));
                    return ['err'=> false, 'data' => ['username' => $username, 'token' => $token]];
                }else{
                    return ['err' => true, 'data' => 'Forkert e-mail eller password'];
                }
            }
        }
        return ['err' => true, 'data' => 'Forkert e-mail eller password'];
    }

    /**
     * Check if givene user exists in database
     *
     * @param string $user
     * @return bool
     */
     public function userExists($user){
        $queryCheckUser = $this->prepQuery("SELECT userId FROM users WHERE userEmail = :EMAIL");
        $queryCheckUser->bindParam(':EMAIL', $user, \PDO::PARAM_STR);
        if($queryCheckUser->execute()){
            return $queryCheckUser->rowCount() > 0 ? true : false;
        }
    }

    /**
     * Undocumented function
     *
     * @param int $userId
     * @return object
     */
     public function getProfileById($userId){
        $queryUserProfile = $this->prepQuery("SELECT userId, userEmail, fkRole,
                                                firstname, lastname, birthdate, street, zipcode, city, phone
                                                FROM users 
                                                INNER JOIN userProfile on fkProfile = profileId
                                                WHERE userId = :ID");
        $queryUserProfile->bindParam(':ID', $userId, \PDO::PARAM_INT);
        return ($queryUserProfile->execute() && $queryUserProfile->rowCount() === 1) ? $queryUserProfile->fetch(\PDO::FETCH_OBJ) : null;
    }

     /**
     * Returns user roles listed in DB
     *
     * @return mixed
     */
     public function getRoles(){
        $queryRoles = $this->prepQuery("SELECT roleId, roleLevel, roleName FROM userRoles ORDER BY roleName ASC");
        if($queryRoles->execute()){
            return $queryRoles->fetchAll(\PDO::FETCH_OBJ);
        }
        return null;
    }

    /**
     * Return all users listed in DB
     *
     * @return mixed
     */
    public function getAllUsers(){
        $queryAllUsers = $this->prepQuery("SELECT userId, userEmail,
                                            firstname, lastname, street, zipcode, city, phone,
                                            DATE_FORMAT(createdOn, '%d %M %Y') AS dateCreated, 
                                            roleLevel, roleName 
                                            FROM users
                                            INNER JOIN userprofile ON profileId = fkProfile
                                            INNER JOIN userRoles ON roleId = fkRole
                                            ");
        if($queryAllUsers->execute()){
            return $queryAllUsers->fetchAll(\PDO::FETCH_OBJ);
        }
        return null;
    }
}