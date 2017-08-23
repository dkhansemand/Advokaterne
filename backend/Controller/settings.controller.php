<?php

class settingscontroller extends DB {
    public function __construct(){
        parent::__construct();
    }

    public function get_all(){
        $querySettings = $this->prepQuery("SELECT siteStreet, siteCity, siteZip, sitePhone, sitePhoneSec, siteDefaultContact, siteEmail FROM sitesettings");
        if($querySettings->execute()){
            return ['err' => false, 'data' => $querySettings->fetch(PDO::FETCH_OBJ)];
        }
        return ['err' => true, 'data' => 'Fejl...'];
    }

    public function save_all($data){
        if(!empty($data)){
            $queryUpdateSettings = $this->prepQuery("UPDATE sitesettings SET siteStreet = :STREET, 
                                                                            siteCity = :CITY, 
                                                                            siteZip = :ZIP, 
                                                                            sitePhone = :PHONE, 
                                                                            sitePhoneSec = :PHONESEC, 
                                                                            siteEmail = :EMAIL, 
                                                                            siteDefaultContact = :CONTACT 
                                                                            WHERE settingsId = 1");
            $queryUpdateSettings->bindParam(':STREET', $data['street'], PDO::PARAM_STR);
            $queryUpdateSettings->bindParam(':CITY', $data['city'], PDO::PARAM_STR);
            $queryUpdateSettings->bindParam(':ZIP', $data['zip'], PDO::PARAM_STR);
            $queryUpdateSettings->bindParam(':PHONE', $data['sitePhone'], PDO::PARAM_STR);
            $queryUpdateSettings->bindParam(':PHONESEC', $data['sitePhoneSec'], PDO::PARAM_STR);
            $queryUpdateSettings->bindParam(':EMAIL', $data['email'], PDO::PARAM_STR);
            $queryUpdateSettings->bindParam(':CONTACT', $data['defaultContact'], PDO::PARAM_STR);
            if($queryUpdateSettings->execute()){
                return ['err' => false, 'data' => 'Indstillinger er nu blevet gemt'];
            }
        }
        return ['err' => true, 'data' => 'Ingen data modtaget'];
    }
}