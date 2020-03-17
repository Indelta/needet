<?php

    $phone = $_POST['phone'];
    
    if (sms($phone)) echo "success";
    else echo "error";
    
    
    function sms($phone) {
        $url = "http://cp.websms.by";
        $timeout = 5;
        $func = 'msg_send_bulk';

        $package = array(
            array(
                'recipient' => "375292819819",
                'message'   => "Заявка с сайта needet.by\n Клиент с номером телефона: $phone заказал обратный звонок",
                'sender'    => 'DeltaPlanBY'
            ),
        );

        $rawData = json_encode($package);
        $ch = curl_init();

    //задаем параметры CURL
        curl_setopt_array($ch, array(
            CURLOPT_URL            => $url,
            CURLOPT_FAILONERROR    => 1,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_TIMEOUT        => $timeout,
            CURLOPT_CONNECTTIMEOUT => 0,
            CURLOPT_POST           => 1,
            CURLOPT_POSTFIELDS     => array(
                'r'        => 'api/' . $func,
                'user'     => 'deltaplanirovanie@gmail.com',
                'apikey'   => '0UmzxrSo9x',
                'messages' => $rawData)
        ));

        $result = curl_exec($ch);

        if ($result) {
            $__BOM = pack('CCC', 239, 187, 191);
            while (0 === strpos($result, $__BOM)) $result = substr($result, 3);
            $result = json_decode($result);
        } else {
            echo 'Ошибка доступа к сервису !';
        }

        curl_close($ch);
    }

?>