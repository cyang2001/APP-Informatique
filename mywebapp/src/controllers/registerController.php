require 'database.php'; 
require 'User.php'; 
class RegisterController{
    private $users;
    private $pdo;
    public function __construct(){
        $this->users = new User($pdo);
    }
    function register(){
        $userName = $_POST['name'];
        $userPassword = $_POST['password'];
        $userEmail = $_POST['email'];
        $comfirmPassword = $_POST['comfirmPassword'];
        if($userPassword != $comfirmPassword){
            $response = [
                'status' => 'error',
                'message' => 'Password and comfirmPassword do not match'
            ];
            echo json_encode($response);
        }
        $this->users->register($userName, $userPassword, $userEmail);

        $response = [
            'status' => 'success',
            'message' => 'User registered successfully'
        ];
        echo json_encode($response);
    }
}

