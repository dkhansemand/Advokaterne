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
}