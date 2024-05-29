<?php
require_once __DIR__ . '/../config/logger.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../tools/UUIDGenerator.php';

class Page {
    private $pdo;
    private $logger;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
        $this->logger = new Logger('../logs/page.log');
    }


    public function getAllPages() {
        $sql = "SELECT * FROM PAGES";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function addPage($name, $url, $parentId = null, $accessLevel = null) {
        $idPage = UUIDGenerator::generate();
        $sql = "INSERT INTO PAGES (ID_PAGE, PAGE_NAME, PAGE_URL, PARENT_ID) VALUES (?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPage, $name, $url, $parentId]);
        $this->logger->log("Page added: {$name} - {$url} - {$idPage}");
        $sql = "INSERT INTO PAGE_ACCESS (ID_PAGE, ID_ACCESS_LEVEL) VALUES (?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$idPage, $accessLevel]);
        $this->logger->log("Access level added: {$accessLevel} - {$idPage}");
        return ['success' => true, 'pageId' => $idPage];
    }


    public function getPage($pageId) {
        $sql = "SELECT * FROM PAGES WHERE ID_PAGE = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$pageId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function updatePage($pageId, $name, $url, $parentId = null, $accessLevel = null) {
        $sql = "UPDATE PAGES SET PAGE_NAME = ?, PAGE_URL = ?, PARENT_ID = ? WHERE ID_PAGE = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $url, $parentId, $pageId]);
        $this->logger->log("Page updated: {$pageId} - {$name}");
        $sql = "UPDATE PAGE_ACCESS SET ACCESS_LEVEL = ? WHERE ID_PAGE = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$accessLevel, $pageId]);
        $this->logger->log("Access level updated: {$accessLevel} - {$pageId}");
        return ['success' => true];
    }


    public function deletePage($pageId) {
        $pageName = $this->getPage($pageId)['PAGE_NAME'];
        $sql = "DELETE FROM PAGES WHERE ID_PAGE = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$pageId]);
        $this->logger->log("Page deleted: {$pageId} - {$pageName}");
        return ['success' => true];
    }


    public function getChildPages($parentId) {
        $sql = "SELECT * FROM PAGES WHERE PARENT_ID = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$parentId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

