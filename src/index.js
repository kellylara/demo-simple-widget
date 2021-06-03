import AdaWidgetSDK from "@ada-support/ada-widget-sdk";

const widgetSDK = new AdaWidgetSDK();

const containerElement = document.getElementById("widget-container");
const inputEmail = document.getElementById("input-email");
const inputFakeCard = document.getElementById("input-fake-cc");
const submitButtonElement = document.getElementById("submit-button");
const submitMessageElement = document.getElementById("submit-message");

const getResponse = (fakeCard) => {
if (fakeCard === '1') {
  return "success: payment completed";
  } else {
    return "error: payment did not go through";
  }
}

submitButtonElement.onclick = () => {
  widgetSDK.sendUserData({
    responseData: getResponse(inputFakeCard.value)
  }, (event) => {
    if (event.type === "SEND_USER_DATA_SUCCESS") {
      submitMessageElement.innerText = "Processing payment ...";
      submitButtonElement.disabled = true;
    } else {
      submitMessageElement.innerText = "Data submission failed, please try again";
    }
  });
};

widgetSDK.init((event) => {
  if (!widgetSDK.widgetIsActive) {
    containerElement.innerHTML = "The widget is not active";
    return;
  }

  const { email } = widgetSDK.widgetInputs;
  console.log(`Email: ${email}`)

  inputEmail.value = email;
});
