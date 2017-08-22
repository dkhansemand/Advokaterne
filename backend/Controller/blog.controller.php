<?php

class blogcontroller extends DB {

    public function __construct(){
        parent::__construct();
    }

    public function get_categories(){
        $queryCategories = $this->prepQuery("SELECT categoryId, categoryName FROM blogCategory ORDER BY categoryName ASC");
        if($queryCategories->execute() && $queryCategories->rowCount() > 0){
            return ['err' => false, 'data' => $queryCategories->fetchAll(PDO::FETCH_OBJ)];
        }   
        return ['err' => false, 'data' => 'Der er ingen kategorier.'];
    }

    public function post_category($categoryData){
        if(!empty($categoryData)){
            if($this->categoryExists($categoryData['name'])){
                return ['err' => true, 'data' => 'Kategorien eksistere allerede.'];
            }else{
                $queryCategoryInsert = $this->prepQuery("INSERT INTO blogCategory (categoryName)VALUES(:NAME)");
                $queryCategoryInsert->bindParam(':NAME', $categoryData['name'], PDO::PARAM_STR);
                if($queryCategoryInsert->execute()){
                    return ['err' => false, 'data' => 'Kategorien er nu tilføjet.'];
                }
            }
        }
        return ['err' => true, 'data' => 'Kan ikke indsætte ny kategori'];
    }

    public function post_editcategory($categoryData){
        if(!empty($categoryData)){
            $queryEditCategory = $this->prepQuery("UPDATE blogCategory SET categoryName = :NAME WHERE categoryId = :ID");
            $queryEditCategory->bindParam(':NAME', $categoryData['name'], PDO::PARAM_STR);
            $queryEditCategory->bindParam(':ID', $categoryData['catId'], PDO::PARAM_INT);
            if($queryEditCategory->execute()){
                return ['err' => false, 'data' => 'Kategorien er nu blevet ændret.'];
            }
        }
        return ['err' => true, 'data' => 'Ingen data modtaget'];
    }

    public function delete_category($catId){
        if(!empty($catId)){
            $queryDeleteCategory = $this->prepQuery("DELETE FROM blogCategory WHERE categoryId = :ID");
            $queryDeleteCategory->bindParam(':ID', $catId, PDO::PARAM_INT);
            if($queryDeleteCategory->execute()){
                return ['err' => false, 'data' => 'Kategorien er nu blevet slettet.'];
            }
        }
        return ['err' => true, 'data' => 'Ingen data modtaget'];
    }

    private function categoryExists($catName){
        if(!empty($catName)){
            $catName = strtolower($catName);
            $queryCategory = $this->prepQuery("SELECT categoryId FROM blogCategory WHERE categoryName = :NAME");
            $queryCategory->bindParam(':NAME', $catName, PDO::PARAM_STR);
            if($queryCategory->execute()){
                return ($queryCategory->rowCount() > 0) ? true : false;
            }
        }
        return false;
    }

    public function post_newpost($postData){
        if(!empty($postData)){
            $categories = explode(',', $postData['category']);
            $publish = $postData['publish'] == 'true' ? 1 : 0;

            $queryInsertPost = $this->prepQuery("INSERT INTO blogPosts (postTitle, postContent, postPublished, postPicture)VALUES(:TITLE, :CONTENT, :PUB, :PIC);");
            $queryInsertPost->bindParam(':TITLE', $postData['title'], PDO::PARAM_STR);
            $queryInsertPost->bindParam(':CONTENT', $postData['content'], PDO::PARAM_STR);
            $queryInsertPost->bindParam(':PUB', $publish, PDO::PARAM_INT);
            $queryInsertPost->bindParam(':PIC', $postData['picture'], PDO::PARAM_INT);
            if($queryInsertPost->execute()){
                $queryLast = $this->prepQuery("SELECT postID FROM blogPosts WHERE postID = LAST_INSERT_ID();");
                if($queryLast->execute()){
                    $lastId = $queryLast->fetch(PDO::FETCH_OBJ);
                    $lastId = $lastId->postID;
                    foreach($categories as $catId){
                        $queryRelateToCategory = $this->prepQuery("INSERT INTO blogCategories (post, category)VALUES(:POST, :CAT)");
                        $queryRelateToCategory->bindParam(':POST', $lastId, PDO::PARAM_INT);
                        $queryRelateToCategory->bindParam(':CAT', $catId, PDO::PARAM_INT);
                        $queryRelateToCategory->execute();
                    }
                    return ['err' => false, 'data' => 'Blog indlæg er blevet tilføjet'];
                }
            }
            return ['err' => false, 'data' => $postData];
        }
        return ['err' => true, 'data' => 'Ingen data modtaget'];
    }

    public function get_posts(){
        $queryPosts = $this->prepQuery("SELECT postID, postTitle, postContent, postPublished, DATE_FORMAT(postDate, '%d-%m-%Y %H:%i') AS postedDate, 
                                            mediaId, filename, filePath
                                            FROM blogPosts
                                            LEFT JOIN media ON postPicture = mediaId
                                            ORDER BY postDate DESC");
        if($queryPosts->execute()){
            return ['err' => false, 'data' => $queryPosts->fetchAll(PDO::FETCH_OBJ)];
        }
        return ['err' => true, 'data' => 'Ingen data...'];
    }

    public function get_categoriesforpost($postId){
        if(!empty($postId)){
            $queryPostCategories = $this->prepQuery("SELECT categoryId, categoryName FROM blogCategories
                                                        INNER JOIN blogCategory ON category = categoryId
                                                        WHERE post = :ID");
            if($queryPostCategories->execute()){
                return ['err' => false, 'data' => $queryPostCategories->fetchAll(PDO::FETCH_OBJ)];
            }
        }
        return ['err' => true, 'data' => 'Kan ikke hente data, mangler ID'];
    }
}