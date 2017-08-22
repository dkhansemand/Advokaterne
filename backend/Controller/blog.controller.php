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
}