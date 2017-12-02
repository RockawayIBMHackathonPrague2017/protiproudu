<?php

namespace App\Http\Controllers;

use App\Api\WatsonApi;
use App\Parsers\ParserProduct;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function index($id)
    {
        $winnerOutput = [];
        $winner = null;
        $showProduct = App('db')->select("SELECT * FROM Mobilni_telefony where ITEM_ID = " . $id . " LIMIT 1");
        if (isset($showProduct[0])) {
            $corectProduct = (array)$showProduct[0];
            $minPrice = $corectProduct['PRICE_VAT'];
            $maxPrice = ($corectProduct['PRICE_VAT'] / 100) * 15 + $minPrice;
            $selectProducts = App('db')->select("SELECT * FROM Mobilni_telefony where PRICE_VAT > " . $minPrice . " AND PRICE_VAT < " . $maxPrice . " ORDER BY PRICE_VAT desc");
            $winner = ParserProduct::getWinerProduct($selectProducts, $corectProduct);
            $winnerOutput = ParserProduct::getWinerDataFormat($winner);
        }

        if ($winner !== null) {
            $watsonApi = new WatsonApi();
            $watsonApi->setCredentials('', '');
            $context = ['criterium' => $winnerOutput['criterium']];
            $watsonApi->setCurrentContext($context);
            $outputJson = $watsonApi->sendWatsonConversationRequest('', '');
            $winnerOutput['text'] = $outputJson['output']['text'];
        }

        return response()->json($winnerOutput);

    }

    public function talk(Request $request)
    {
        $text = $request->get('text');
        $winnerOutput = [];
        $winnerOutput['text'] = null;

        $watsonApi = new WatsonApi();
        $watsonApi->setCredentials('', '');
        $context = ['criterium' => ''];
        $watsonApi->setCurrentContext($context);
        $outputJson = $watsonApi->sendWatsonConversationRequest($text, '');

        if (isset($outputJson['output'])) {
            $winnerOutput['text'] = $outputJson['output']['text'];
            if (isset($outputJson['context']['success']) && $outputJson['context']['success'] == 'success') {
                $winnerOutput['successData'] = 'success';
            }
        }

        return response()->json($winnerOutput);

    }
}
