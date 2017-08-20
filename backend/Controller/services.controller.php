<?php

class servicescontroller extends DB {

    public function __construct(){
        parent::__construct();
    }

    public function get_list(){
        
        $queryServices = $this->prepQuery("SELECT serviceId, serviceName, servicePicture FROM services");
        if($queryServices->execute()){
            return ['err' => false, 'data' => $queryServices->fetchAll(PDO::FETCH_OBJ)];
        }
        return null;
    }

    public function get_service(int $serviceId) : array{
        if(!empty($serviceId)){
            $queryService = $this->prepQuery("SELECT serviceId, serviceName, serviceContent, servicePicture FROM services WHERE serviceId = :ID");
            $queryService->bindParam(':ID', $serviceId, PDO::PARAM_INT);
            if($queryService->execute()){
                return ['err' => false, 'data' => [$queryService->fetch(PDO::FETCH_OBJ)]];
            }
        }
        return ['err' => true, 'data' => null];
    }

    public function post_editservice($data){
        if(!empty($data)){
            $queryUpdateService = $this->prepQuery("UPDATE services SET serviceName = :NAME, serviceContent = :CONTENT, servicePicture = :PICTURE WHERE serviceID = :ID");
            $queryUpdateService->bindParam(':NAME', $data['name'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':CONTENT', $data['content'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':PICTURE', $data['picture'], PDO::PARAM_INT);
            $queryUpdateService->bindParam(':ID', $data['id'], PDO::PARAM_INT);
            if($queryUpdateService->execute()){
                return ['err' => false, 'data' => 'service updated'];
            }
        }
        return ['err' => true, 'data' => null];
    }

    public function post_addservice($data){
        if(!empty($data)){
            $queryUpdateService = $this->prepQuery("INSERT INTO services (serviceName, serviceContent, servicePicture)VALUES(:NAME, :CONTENT, :PICTURE)");
            $queryUpdateService->bindParam(':NAME', $data['name'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':CONTENT', $data['content'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':PICTURE', $data['picture'], PDO::PARAM_INT);
            if($queryUpdateService->execute()){
                return ['err' => false, 'data' => 'service added'];
            }
        }
        return ['err' => true, 'data' => null];
    }

    public function delete_service($serviceId){
        if(!empty($serviceId)){
            $queryDeleteService = $this->prepQuery("DELETE FROM services WHERE serviceId = :ID");
            $queryDeleteService->bindParam(':ID', $serviceId, PDO::PARAM_INT);
            if($queryDeleteService->execute()){
                return ['err' => false, 'data' => 'Service is now deleted'];
            }
        }
        return ['err' => true, 'data' => 'ServiceId missing'];
    }
}