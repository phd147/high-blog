function addCodeLabel() {
  var langClasses = document.getElementsByTagName("code");
  for (let i = 0; i < langClasses.length; i++) {
    var lang = langClasses[i].className.toString().split("-")[1].toUpperCase();
    document.getElementsByTagName("pre")[i].setAttribute("data-language", lang);
  }
}
const CSSHelper = { addCodeLabel };
export default CSSHelper;
