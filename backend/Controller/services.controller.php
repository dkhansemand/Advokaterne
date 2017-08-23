<?php

class servicescontroller extends DB {

    public function __construct(){
        parent::__construct();
    }

    public function get_list(){
        
        $queryServices = $this->prepQuery("SELECT serviceId, serviceName, serviceContent, serviceShortdesc mediaId, filename, filePath 
                                            FROM services 
                                            LEFT JOIN media ON mediaId = servicePicture
                                            ORDER BY serviceName ASC");
        if($queryServices->execute()){
            return ['err' => false, 'data' => $queryServices->fetchAll(PDO::FETCH_OBJ)];
        }
        return null;
    }

    public function get_service(int $serviceId) : array{
        if(!empty($serviceId)){
            $queryService = $this->prepQuery("SELECT serviceId, serviceName, serviceContent, serviceShortdesc, mediaId, filename, filePath 
                                                FROM services 
                                                LEFT JOIN media ON mediaId = servicePicture
                                                WHERE serviceId = :ID");
            $queryService->bindParam(':ID', $serviceId, PDO::PARAM_INT);
            if($queryService->execute()){
                return ['err' => false, 'data' => [$queryService->fetch(PDO::FETCH_OBJ)]];
            }
        }
        return ['err' => true, 'data' => null];
    }

    public function post_editservice($data){
        if(!empty($data)){
            $queryUpdateService = $this->prepQuery("UPDATE services SET serviceName = :NAME, serviceContent = :CONTENT, serviceShortdesc = :SHORTDESC, servicePicture = :PICTURE WHERE serviceID = :ID");
            $queryUpdateService->bindParam(':NAME', $data['name'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':CONTENT', $data['content'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':SHORTDESC', $data['shortdesc'], PDO::PARAM_STR);
            $queryUpdateService->bindParam(':PICTURE', $data['pictureId'], PDO::PARAM_INT);
            $queryUpdateService->bindParam(':ID', $data['id'], PDO::PARAM_INT);
            if($queryUpdateService->execute()){
                return ['err' => false, 'data' => 'service opdateret'];
            }
        }
        return ['err' => true, 'data' => null];
    }

    public function post_addservice($data){
        if(!empty($data)){
            $queryAddService = $this->prepQuery("INSERT INTO services (serviceName, serviceContent, servicePicture, serviceShortdesc)VALUES(:NAME, :CONTENT, :PICTURE, :SHORTDESC)");
            $queryAddService->bindParam(':NAME', $data['name'], PDO::PARAM_STR);
            $queryAddService->bindParam(':CONTENT', $data['content'], PDO::PARAM_STR);
            $queryAddService->bindParam(':PICTURE', $data['pictureId'], PDO::PARAM_INT);
            $queryAddService->bindParam(':SHORTDESC', $data['shortdesc'], PDO::PARAM_STR);
            if($queryAddService->execute()){
                return ['err' => false, 'data' => 'service tilføjet'];
            }
        }
        return ['err' => true, 'data' => null];
    }

    public function delete_service($serviceId){
        if(!empty($serviceId)){
            $queryDeleteService = $this->prepQuery("DELETE FROM services WHERE serviceId = :ID");
            $queryDeleteService->bindParam(':ID', $serviceId, PDO::PARAM_INT);
            if($queryDeleteService->execute()){
                return ['err' => false, 'data' => 'Service er nu slettet'];
            }
        }
        return ['err' => true, 'data' => 'ServiceId missing'];
    }
}