<?php
//require_once dirname(__FILE__). "/login_status.php";
require_once dirname(__FILE__) . "/include/head.php";
require_once $_SERVER["DOCUMENT_ROOT"]. "/HW3_110705063/models/db_check.php";
$conn = db_check();
?>

<html>
    <head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>My personal webpage</title>
    </head>
    <body>
        <header>
            <nav class="navbar">
                <a href="#about">About</a>
                <a href="#skill">Skill</a>
                <a href="#programming">Programming</a>
                <a href="#language">Languages</a>
                <a href="#interest">Interests</a>
                <a href="#contact">contact</a>
                <?php
                    if (isset($_SESSION['login'])) {
                        require_once dirname(__FILE__) . "/online_nav.php";
                    } else {
                        require_once dirname(__FILE__) . "/offline_nav.php";
                    }
                ?>
                <div class="hoverbox"></div>
            </nav>

            <div id="nav_slide" class="slide-container">
                <div class="slider">
                    <img src="../src/images/me.jpg" alt="just me">
                    <img src="../src/images/skill.JPG" alt="bodybuilding">
                    <img src="../src/images/programming.jpg" alt="programming">
                    <img src="../src/images/language.jpg" alt="dance">
                    <img src="../src/images/music.jpg" alt="music">
                    <img src="../src/images/contact.jpg" alt="boxing">
                </div>
                
                <div id="about">
                    <div class="avatar">
                        <h1>HI! I'm Wilson!</h1>
                        <img href="../src/images/myhead.jpg" alt="myhead">
                    </div>
                    <div>I am a sophomore of Department of information management and finance, NCTU.
                        I was graduated from The Affiliated Senior High School of National Taiwan Normal University.
                        <br><br>
                        I was an introvert person before entering college, to break the situation, I have made
                        this department to be by first choise. After that, despite a tiring journey, 
                        but I have learned a lot, and made friend with many amazing people!
                    </div>
                </div>
            </div>
        </header>

        <main>
            <div id="skill" class="paragraph">
                <div>
                    <div>
                        <h1>Propessional skill</h1>
                        因就讀於交大資財系，因而同時具備了財金與資訊能力。
                    此外，由於在大二上修讀"JavaScript網頁程式設計"(被當)
                    一門課程及課程project的訓練，具備一定程度的前後端網頁程式設計能力
                    ，並成功將其與本身具備的繪圖與平面設計結合。
                    儼然是時下最受重視的跨領域人才(自己看都覺得尷尬)。
                    </div>
                    <div id="skilllist">
                        <div>Finance<div class="r-progress"></div></div>
                        <div>Front end<div class="r-progress"></div></div>
                        <div>Back end<div class="r-progress"></div></div>
                        <div>Algorithm<div class="r-progress"></div></div>
                        <div>Visual design<div class="r-progress"></div></div>
                        <div>UX/UI design<div class="r-progress"></div></div>
                    </div>
                </div>
                    
            </div>

            <div id="programming" class="paragraph">
                <img src="../src/images/programming2.jpg" alt="programming skill">
                <h1>Programming skill</h1>
                <div class="g-container"><div class="g-progress"><br>C/C++</div></div>
                <div class="g-container"><div class="g-progress"><br>Python</div></div>
                <div class="g-container"><div class="g-progress"><br>HTML/CSS/JavaScript</div></div>
                <div class="g-container"><div class="g-progress"><br>PHP</div></div>
            </div>
            
            <div id="language" class="paragraph">
                <h1>Languages</h1>
                <div class="languages">
                    <div>English:<br>just...good, you know<img src="../src/images/flag-usa.jpg" alt="flag-usa"></div>
                    <div>中文:<br>good as fuck DDDD<img src="../src/images/flag-twn.jpg" alt="flag-twn"></div>
                    <div>日本語:<br>未來のN1<img src="../src/images/flag-jpn.jpg" alt="flag-jpn"></div>
                    <div>Français:<br>Bonjour! Bonsoir!<img src="../src/images/flag-frn.jpg" alt="flag-frn"></div>
                </div>
                
            </div>
            <div id="interest" class="paragraph">
                <img src="../src/images/skill2.JPG" alt="skill2">
                <h1>Interests</h1>
                <div id="int_slide" class="slide-container">
                    <span id="previous">＜</span>
                    <span id="next">＞</span>
                    <div class="slider">
                        <img src="../src/images/finance.jpg" alt="just me">
                        <img src="../src/images/bodybuilding.jpg" alt="bodybuilding">
                        <img src="../src/images/music.jpg" alt="programming">
                        <img src="../src/images/dance.jpg" alt="dance">
                        <img src="../src/images/drawing.jpg" alt="music">
                        <img src="../src/images/boxing.jpg" alt="boxing">
                    </div>
                    <span id="text">Finance</span>
                <div>
            </div>
        </main>
        
        <footer >
            <div id="resume" class="paragraph">
                <img src="../src/images/languague2.JPG" alt="adeliu">
                <a href="../src/images/resume.gif" download="resume.gif">Download my resume</a>
            </div>
            

            <div id="contact">
                <div id="myInformation">
                    <h1>Contact us</h1>
                    <div style="height: 30%;">The website has ended here, thank's for your visiting.
                            This is my dedication, it's a long progress doing it, and I indeed learning a lot during these time.
                    </div>
                    <div class="formal"><img src="../src/images/tel-logo.png" alt="telephone">Tel:xx-xxxx-xxxx</div>
                    <div class="formal"><img src="../src/images/email-logo.png" alt="email">Email:example@gmail.com</div>
                    <div class="formal"><img src="../src/images/address-logo.png" alt="address">Address:金城二路(X)</div>
                    
                    <div id="media">
                        <a href="./wu.html"><img src="../src/images/twitter-logo.png" alt="twitter"></a>
                        <a href="https://www.facebook.com/profile.php?id=100003850343087"><img src="../src/images/fb-logo.png" alt="facebook"></a>
                        <a href="https://www.instagram.com/wilsonliao911226/"><img src="../src/images/ig-logo.png" alt="instagram"></a>
                    </div>
                </div>
                <form id="writeUs">
                    <h1>Write us</h1>
                    <div class="input">
                        <label>Name</label>
                        <textarea type="text" id="nameText" name="name" placeholder="ex:Handsome man" rows="1" cols="20" required></textarea>
                    </div>

                    <div class="input_container">
                        <div class="input">
                            <label>Email</label>
                            <textarea type="email" id="emailText" name="email" placeholder="ex:example@gmail.com" rows="1" cols="20" required></textarea>
                        </div>
                        <div class="input">
                            <label>telephone number</label>
                            <textarea type="tel" id="telText" name="tel" placeholder="ex:xx-xxxx-xxxx" rows="1" cols="20" required></textarea>
                        </div>
                    </div>
                    
                    <div class="input">
                        <label>subtext</label>
                        <textarea type="text" id="subText" name="subtext" placeholder="主旨" rows="1" cols="20" required></textarea>
                    </div>
                    
                    <div class="input bodyText">
                        <label>Bodytext</label>
                        <textarea type="text" id="bodyText" name="bodytext" rows="6" cols="20" placeholder="praise me" required></textarea>
                    </div>
                    
                    <div class="input_container">
                        <a id="mailTo"><input type="button" value="Sent message" onclick="submitHandler();"></a>
                    </div>
                </form>
            </div>
        </footer>

        <button onclick="topFunction()" id="myBtn">↑</button>
    </body>
</html>