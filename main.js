(function() {

	var sSerpResultsSelector	= "h3.r a",
		$serpResults,
		oRegexManualUrl			= /http:\/\/php\.net\/manual\/([a-z]+\/)?.*/,
		aManualUrlMatches,
		aIframesPreview = [];

	$serpResults = $(sSerpResultsSelector);

	for (i in $serpResults)
	{
		if (aManualUrlMatches = oRegexManualUrl.exec($serpResults[i].href))
		{
			(function (i)
			{
				$.get(aManualUrlMatches[0], function(html)
				{
					receiverButton = document.createElement("button");
					receiverButton.id = "receiverButton";
					$(receiverButton).click(function()
					{
						//console.log(this);//.attr("class"));
						$(".g:eq(" + i + ")")
							.html($(this).val())
							.addClass("phpManual-transformed");

						document.getElementById("center_col").style.width = "auto";
						$("#center_col").css("width", "auto");
					});
					document.body.appendChild(receiverButton);

					//Strip the head to avoid loading JS and CSS
					html = /[\s\S]*<\/head\>([\s\S]*)/.exec(html)[1];

					/** @todo Eliminar imágenes para no cargar recursos innecesarios */
					/** @todo Transformar los links en el manual convirtiendo las rutas en URL absolutas con dominio (ahora sale https://www.google.es/function.preg-replace.php) */

					html = html.replace("</body>", 
						["<script>",
						"parent.document.getElementById('receiverButton').value = document.getElementsByClassName('refsect1')[0].innerHTML;",
						"parent.document.getElementById('receiverButton').click(); </script></body>"].join(""));

					aIframesPreview[i] = document.createElement("iframe");
					aIframesPreview[i].srcdoc = html;
					aIframesPreview[i].style.display = 'none';
					document.body.appendChild(aIframesPreview[i]);
				});
			})(i);
		}
	}

})();