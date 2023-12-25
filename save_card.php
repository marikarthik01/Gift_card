<?php
// Assuming you have a database connection already established
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gift_cards";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$cardNumber = $_POST['cardNumber'];
$balance = $_POST['balance'];
$customerNumber = $_POST['customerNumber'];

    // Construct the SQL query
    $sql = "INSERT INTO cards (card_number, balance, customer_number) VALUES ('$cardNumber', '$balance', '$customerNumber')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "Card information successfully stored in the database";
        header("Location: thankyou.html");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }



$conn->close();
?>
