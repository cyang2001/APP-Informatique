
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase {
    private $pdo;
    private $user;

    protected function setUp(): void {
        $this->pdo = new PDO('mysql:host=127.0.0.1;dbname=APP', 'root', '123456');
        $this->user = new User($this->pdo);
    }

    public function testRegisterExistingEmail() {
        
        $result = $this->user->register("yc", "cc", "c@c.com");
        $this->assertFalse($result['success']);
        $this->assertEquals('Email already exists', $result['message']);
    }

    public function testRegisterNewUser() {
        $result = $this->user->register("yc", "cc", "c@c.com");
        $this->assertTrue($result['success']);
        $this->assertIsNumeric($result['userId']);
    }

    protected function tearDown(): void {
        $this->pdo = null;
        $this->user = null;
    }
}
