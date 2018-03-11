<?php
//config
error_reporting( 0 );
$easyMode = true;// allude to username being correct
$usernames = array('admin', 'pprice', 'sknowles');
$password = 'july4th';
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <style>
    body{ background: #222; color: #aaa; }
    </style>
    <?php
    $errorClass = '';
    $loginSuccess = false;
    $invalidMsg = '';
    if(sizeof($_POST)===2 && in_array($_POST['username'], $usernames, false) && $_POST['password']===$password){
      $loginSuccess = true;
    }else if(sizeof($_POST)===2 && in_array($_POST['username'], $usernames, false) && $easyMode===true){
      $invalidMsg = 'Wrong password';
      $errorClass = 'is-invalid';
    }else if(sizeof($_POST)>0){
      $invalidMsg = 'Wrong username or password';
      $errorClass = 'is-invalid';
    }
    ?>
    <title>E-Corp CEO Login</title>
  </head>
  <body>
    <div class="container">
      <div class="row justify-content-center">
          
      <?php if(!$loginSuccess){ ?>
          <div class="col-sm-4">
            <h1>E-Corp Portal Login</h1>
            <?php if($errorClass!==''){ ?>
              <div class="alert alert-danger" role="alert">
              <?=$invalidMsg?>
            </div>
          <?php } ?>

            <form method="post">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control <?=$errorClass?>" id="username" placeholder="Enter username" name="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control <?=$errorClass?>" id="password" placeholder="Password" name="password">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="rememberMe">
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>

      <?php }else{ ?>

          <div class="col-sm-12">
            <h1>E-Corp Portal</h1>
          <h3>Employee Data</h3>
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Phillip Price</td>
                <td>Price</td>
                <td>CEO</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Scott</td>
                <td>Knowles</td>
                <td>CTO</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>James</td>
                <td>Plouffe</td>
                <td>EVP of Technology</td>
              </tr>
            </tbody>
          </table>
          <p class="font-italic">flag{s0m3_p4sswordz_caN_be_gueSSed}</p>
          </div>
      <?php } ?>
      </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
