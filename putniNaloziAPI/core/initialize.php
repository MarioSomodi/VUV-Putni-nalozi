<?php
    defined('DS') ? null : define('DS', DIRECTORY_SEPARATOR); 
    defined('SITE_ROOT') ? null : define('SITE_ROOT', DS.'wamp64'.DS.'www'.DS.'Mario_Somodi'.DS.'KV'.DS.'VUV-Putni-nalozi'.DS.'putniNaloziAPI');
    defined('INC_PATH') ? null : define('INC_PATH', SITE_ROOT.DS.'includes');
    defined('CORE_PATH') ? null : define('CORE_PATH', SITE_ROOT.DS.'core');
    
    //Load config file
    require_once(INC_PATH.DS.'config.php');
    //Load core classes
    require_once(CORE_PATH.DS.'putniNalog.php');
    require_once(CORE_PATH.DS.'zaposlenik.php');
?>