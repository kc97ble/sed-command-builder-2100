import * as $ from "jquery";
import { build } from "./utils/builder";
import { FormData } from "./types";

console.log("Welcome to sed-command-builder!");
$("body").css("background-color", "#fcfcfc");
(window as any).jquery = $; // for debugging purpose only

const formData: FormData = {
  condition: "all",
  command: "none",
};

type BuildResult = { ok: true; result: string } | { ok: false; message: string };

function getBuildResult(): BuildResult {
  try {
    const result = build(formData);
    return { ok: true, result };
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    return { ok: false, message };
  }
}

function render() {
  for (const name in formData) {
    $(`input[type=text][name=${name}]`).val(formData[name]);
    $(`input[type=number][name=${name}]`).val(formData[name]);
    $(`input[type=radio][name=${name}]`).val([formData[name]]);
  }
  const buildResult = getBuildResult();
  if (buildResult.ok) {
    $("#result-0949").text(buildResult.result).css("color", "inherit");
  } else {
    $("#result-0949").text(buildResult.message).css("color", "red");
  }
}

function setup() {
  $("body")
    .find("input")
    .each((_, inputElement) => {
      $(inputElement).on("input", () => {
        const { name, value } = inputElement;
        formData[name] = value;
        render();
      });
    });
}

window.onload = () => {
  setup();
  render();
};
