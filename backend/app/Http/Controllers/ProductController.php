<?php

namespace App\Http\Controllers;

use App\Parsers\ParserProduct;

class ProductController extends Controller
{
    public function index($id)
    {
        $winnerOutput = [];
        $showProduct = App('db')->select("SELECT * FROM Mobilni_telefony where ITEM_ID = " . $id . " LIMIT 1");
        if (isset($showProduct[0])) {
            $corectProduct = (array)$showProduct[0];
            $minPrice = $corectProduct['PRICE_VAT'];
            $maxPrice = ($corectProduct['PRICE_VAT'] / 100) * 15 + $minPrice;
            $selectProducts = App('db')->select("SELECT * FROM Mobilni_telefony where PRICE_VAT > " . $minPrice . " AND PRICE_VAT < " . $maxPrice . " ORDER BY PRICE_VAT desc");
            $winner = ParserProduct::getWinerProduct($selectProducts, $corectProduct);
            $winnerOutput = ParserProduct::getWinerDataFormat($winner);
        }
        return response()->json($winnerOutput);
    }
}