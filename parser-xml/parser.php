<?php

require_once __DIR__ . "/vendor/autoload.php";

$streamer = \Prewk\XmlStringStreamer::createStringWalkerParser(__DIR__ . "/cz-rockaway-ibm-hackathon.xml");

$file = 'output.xml';
file_put_contents($file, '');
file_put_contents($file, '<?xml version="1.0" encoding="UTF-8"?> <SHOP>', FILE_APPEND);
$i = 0;
$parseCategory = "Bílé zboží > Myčky > Volně stojící myčky";

while ($node = $streamer->getNode()) {
    $simpleXmlNode = simplexml_load_string($node);
    $categoryText = (string)$simpleXmlNode->CATEGORYTEXT;
    if (strpos($categoryText, $parseCategory) !== false) {
        file_put_contents($file, $node, FILE_APPEND);
        $i++;
    }
}

file_put_contents($file, '</SHOP>', FILE_APPEND);
echo 'Count export items ' . $i;