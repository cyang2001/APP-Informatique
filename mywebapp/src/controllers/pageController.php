<?php

class pageController {
    private $pageModel;

    public function __construct() {
        $this->pageModel = new Page();
    }


    public function getPages() {
        $pages = $this->pageModel->getAllPages();
        header('Content-Type: application/json');
        echo json_encode($pages);
    }


    public function addPage($pageName, $pageUrl, $parentId = null, $accessLevel = null) {
        $result = $this->pageModel->addPage($pageName, $pageUrl, $parentId, $accessLevel);
        header('Content-Type: application/json');
        echo json_encode($result);
    }


    public function updatePage($pageId, $pageName, $pageUrl, $parentId = null, $accessLevel = null) {
        $result = $this->pageModel->updatePage($pageId, $pageName, $pageUrl, $parentId, $accessLevel);
        header('Content-Type: application/json');
        echo json_encode($result);
    }


    public function deletePage($pageId) {
        $result = $this->pageModel->deletePage($pageId);
        header('Content-Type: application/json');
        echo json_encode($result);
    }


    public function getPage($pageId) {
        $page = $this->pageModel->getPage($pageId);
        header('Content-Type: application/json');
        echo json_encode($page);
    }


    public function getChildPages($parentId) {
        $pages = $this->pageModel->getChildPages($parentId);
        header('Content-Type: application/json');
        echo json_encode($pages);
    }
}
?>
