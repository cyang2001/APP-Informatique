<?php
require_once __DIR__ . '/../models/pages.php';

class PageController {
    private $pageModel;
    private $logger;
    public function __construct() {
        $this->pageModel = new Page();
        $this->logger = new Logger('../logs/page.log');
    }

    public function getPages($userAccessLevel) {
        $pages = $this->pageModel->getAllPages($userAccessLevel);
        $this->logger->log("User access level: {$userAccessLevel}");
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

    public function checkAccessLevel($requiredLevel) {
        if (!isset($_SESSION['user']['access_level']) || $_SESSION['user']['access_level'] < $requiredLevel) {
            header('HTTP/1.1 403 Forbidden');
            echo "Access denied. You do not have permission to access this page.";
            exit();
        }
    }
}
?>
