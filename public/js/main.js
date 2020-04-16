$(() => {


    entrar = () => {

        const email = $("#email").val(),
            senha = $("#senha").val();

        let dados = {
            email: email,
            senha: senha
        }
        let data = JSON.stringify(dados)
        console.log(data);
        $.ajax({
            url: `http://localhost/auth`,
            method: "POST",
            data: {
                data
            },
            success: function(data) {
                if (data.retorno) {
                    window.location.href = "/dashboard";
                }
            },
            error: function(e) {
                $("#msg").css("color", "#ff0000");
                $("#senha").val("");
                $("#msg").html(e.responseText);
            }
        });
    }

    upload = () => {
        const formData = new FormData();

        const data = {
            utilizador: $("#utilizador").val(),
            dominio: $("#dominio").val(),
            documento: $("#nome_documento").val(),
            data_envio: new Date()
        }

        formData.append('documento', $('#documento')[0].files[0]);
        formData.append('info', JSON.stringify(data));

        $(".loading").css("display", "block");

        $.ajax({
            url: '/envia',
            data: formData,
            timeout: 30000,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        console.log((e.loaded / e.total) * 100);
                        $(".loading").css("width", ((e.loaded / e.total) * 100) + "%");
                        $(".loading").html(((e.loaded / e.total) * 100).toFixed(1) + "%");
                    }
                };
                return xhr;
            },
            success: data => {
                if (data.retorno) {
                    window.location.href = "/sucesso";
                }
            },

        });
    }
});