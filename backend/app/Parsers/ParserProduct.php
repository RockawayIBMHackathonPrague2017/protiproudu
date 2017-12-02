<?php

namespace App\Parsers;

class ParserProduct
{
    static function getWinerProduct($products, $actualProduct)
    {
        $winnerPrice = null;
        $winner = null;
        foreach ($products as $product) {
            $product = (array)$product;
            $actualCapacity = str_replace(' mAh', '', $actualProduct['KapacitaBaterie']);
            $productCapacity = str_replace(' mAh', '', $product['KapacitaBaterie']);
            $actualRam = str_replace(' MB', '', $actualProduct['OperacniPamet']);
            $productRam = str_replace(' MB', '', $product['OperacniPamet']);
            if (($productCapacity > $actualCapacity && $productRam > $actualRam)) {
                $priceProduct = $winner['PRICE_VAT'];
                if ($winnerPrice === null || $priceProduct > $winnerPrice) {
                    $winner = $product;
                    $winnerPrice = $priceProduct;
                    $winner['criterium'] = 'both';
                }
            } elseif ($productCapacity > $actualCapacity && $productRam == $actualRam) {
                $priceProduct = $winner['PRICE_VAT'];
                if ($winnerPrice === null || $priceProduct > $winnerPrice) {
                    $winner = $product;
                    $winnerPrice = $priceProduct;
                    $winner['criterium'] = 'batery';
                }
            } elseif ($productCapacity == $actualCapacity && $productRam > $actualRam) {
                $priceProduct = $winner['PRICE_VAT'];
                if ($winnerPrice === null || $priceProduct > $winnerPrice) {
                    $winner = $product;
                    $winnerPrice = $priceProduct;
                }
                $winner['criterium'] = 'ram';
            }
        }

        return $winner;
    }

    static function getWinerDataFormat($winner)
    {
        if ($winner !== null) {
            $output['url'] = $winner['URL'];
            $image = $winner['IMGURL'];
            $image = str_replace('800/600/', '165/145/', $image);
            $output['image'] = $image;
            $price = $winner['PRICE_VAT'];
            $formatter = new \NumberFormatter('cs_CS', \NumberFormatter::CURRENCY);
            $price = $formatter->formatCurrency($price, 'CZK');
            $output['price'] = "▶ " . $price;
            $output['motivationText'] = $winner['PRODUCTNAME'];
            $output['criterium'] = $winner['criterium'];
            return $output;
        }
    }
}