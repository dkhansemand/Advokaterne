<?php

class mediacontroller extends DB{

    private $error = array(
        0 => '',
        1 => 'Filens størrelse overskrider \'upload_max_filesize\' directivet i php.ini.',
        2 => 'Filen størrelse overskride \'MAX_FILE_SIZE\' directivet i HTML formen.',
        3 => 'File blev kun delvis uploadet.',
        4 => 'Filen blev ikke uploaded.',
        6 => 'Kunne ikke finde \'tmp\' mappen.',
        7 => 'Kunne ikke gemme filen på disken.',
        8 => 'A PHP extension stopped the file upload.'
    );

    private $mimeType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    private $uploadFolder = './uploads/';

    public function __construct(){
        parent::__construct();
    }

    public function file_upload() : array{
        $file = $_FILES['file'];

        if($file['error'] === 0){
            
            if(!in_array($file['type'], $this->mimeType)){
                return [
                    'err' => true,
                    'data' => 'Filtypen er ikke tilladt.'
                ];
            }

            if(!file_exists($this->uploadFolder)){
                mkdir($this->uploadFolder, 0755, true);
            }

            $fileName = time() . '_' . substr($file['name'], 0, 100);
            $fileName = str_replace(' ', '', $fileName);
            $relPath = '/uploads/';
            if(move_uploaded_file($file['tmp_name'], $this->uploadFolder . $fileName)){
                $queryInsertPicture = $this->prepQuery("INSERT INTO media (filename, filePath, fileType)VALUES(:NAME, :FPATH, :FTYPE)");
                $queryInsertPicture->bindParam(':NAME', $fileName, PDO::PARAM_STR);
                $queryInsertPicture->bindParam(':FPATH', $relPath, PDO::PARAM_STR);
                $queryInsertPicture->bindParam(':FTYPE', $file['type'], PDO::PARAM_STR);

                if($queryInsertPicture->execute()){
                    return [
                        'error' => false,
                        'data' => 'FIlen ' . $file['name'] . ' er nu blevet uploadet'
                    ];
                }else{
                    unlink($this->uploadFolder.$fileName);
                    return ['err' => true, 'data' => 'Kunne ikke tilføje filen til databasen!'];
                }
            }
        }

        return ['err' => true,
                'data' => 'Filen ' . $_FILES['file']['name'] . ' kunne ikke uploades til serveren! Fejlkode ' . $_FILES['file']['error'] . ' - ' . $this->error[$_FILES['file']['error']]
                ];
    }

    public function get_list() : array{
        $queryMedia = $this->prepQuery("SELECT mediaId, filename, filePath, mediaTag FROM media");
        if($queryMedia->execute()){
            $mediaItems = $queryMedia->fetchAll(PDO::FETCH_OBJ);
            $mediaList = [];
            foreach($mediaItems as $media){
                if($media->mediaId != 0){
                    if(file_get_contents('./uploads/'.$media->filename)){
                        array_push($mediaList, ['id' => $media->mediaId,'file' => $media->filePath.$media->filename]);
                    }
                }
            }
            return ['err' => false, 'data' => $mediaList];
        }
    }

    public function get_itembyid($mediaId){
        if(!empty($mediaId)){
            $queryMediaById = $this->prepQuery("SELECT mediaId, filename, filePath, mediaTag FROM media WHERE mediaId = :ID");
            $queryMediaById->bindParam(':ID', $mediaId, PDO::PARAM_INT);
            if($queryMediaById->execute()){
                return ['err' => false, 'data' => $queryMediaById->fetchAll(PDO::FETCH_OBJ)];
            }
        }
        return ['err' => true, 'data' => 'Intet ID angivet...'];
    }

    public function get_bytag($tag){
        if(!empty($tag)){
            $queryMediaByTag = $this->prepQuery("SELECT mediaId, filename, filePath FROM media WHERE mediaTag = :TAG");
            $queryMediaByTag->bindParam(':TAG', $tag, PDO::PARAM_STR);
            if($queryMediaByTag->execute()){
                return ['err' => false, 'data' => $queryMediaByTag->fetchAll(PDO::FETCH_OBJ)];
            }
        }   
        return ['err' => true, 'data' => 'Ingen tag defineret'];
    }

    public function delete_item(int $mediaId) : array{
        if(!empty($mediaId)){
            $queryMedia = $this->prepQuery("SELECT filename, filePath FROM media WHERE mediaId = :ID");
            $queryMedia->bindParam(':ID', $mediaId, PDO::PARAM_INT);
            if($queryMedia->execute() && $queryMedia->rowCount() > 0){
                $mediaItem = $queryMedia->fetch(PDO::FETCH_OBJ);
                $queryDelete = $this->prepQuery("DELETE FROM media WHERE mediaId = :ID");
                $queryDelete->bindParam(':ID', $mediaId, PDO::PARAM_INT);
                if($queryDelete->execute()){
                    if(file_exists('./uploads/'.$mediaItem->filename)){
                        if(unlink('./uploads/'.$mediaItem->filename)){
                            return ['err' => false, 'data' => 'Filen er nu blevet slettet fra serveren.'];
                        }else{
                            return ['err' => true, 'data' => 'Filen kunne ikke slettes på serveren.'];
                        }
                    }else{
                        return ['err' => true, 'data' => 'Det var ikke muligt at finde pågældende fil på serveren.'];
                    }
                }
            }else{
                return ['err' => true, 'data' => 'Kunne ikke finde filen i databasen'];
            }
        }
        return ['err' => true, 'data' => ''];
    }
}