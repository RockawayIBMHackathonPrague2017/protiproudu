<?php

namespace App\Api;

class WatsonApi
{

    private $watsonCredentialsUser = "";
    private $watsonCredentialsPassword = "";
    private $currentContext = null;

    function __construct()
    {
    }


    public function setCredentials($username, $password)
    {
        $this->watsonCredentialsUser = $username;
        $this->watsonCredentialsPassword = $password;
    }

    public function sendWatsonConversationRequest($text, $workspace)
    {
        $curl = curl_init();

        //$context_data = json_decode($this->currentContext);
        $post_args = array(
            'input' => array(
                'text' => $text
            ),
            'context' =>
                $this->getCurrentContext(),
        );

        $data = json_encode($post_args);

        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data))
        );
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $this->watsonCredentialsUser . ":" . $this->watsonCredentialsPassword);
        curl_setopt($curl, CURLOPT_URL, "https://gateway.watsonplatform.net/conversation/api/v1/workspaces/" . $workspace . "/message?version=2016-09-20");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($curl);
        if (curl_errno($curl)) {
            echo 'Error:' . curl_error($curl);
        }
        curl_close($curl);
        $decoded = json_decode($result, true);
        return $decoded;
    }

    /**
     * @param array $currentContext
     */
    public function setCurrentContext($currentContext)
    {
        $this->currentContext = $currentContext;
    }

    /**
     * @return array
     */
    public function getCurrentContext()
    {
        return $this->currentContext;
    }


}