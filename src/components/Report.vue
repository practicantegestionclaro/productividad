<template>
  <div id="reportContainer" style="height:600px"></div>
</template>

<script setup>
import * as powerbi from "powerbi-client";

const embedReport = () => {
  const embedConfiguration = {
    type: "report",
    id: "TU_REPORT_ID",
    embedUrl: "https://app.powerbi.com/links/CQ5AZVJStt?ctid=46bb22b8-4c2c-40ff-8360-7b6334821279&pbi_source=linkShare&bookmarkGuid=29da2085-e69b-4b84-8379-220e895b129a",
    accessToken: "TOKEN_EMBED_GENERADO_EN_BACKEND",
    settings: {
      panes: {
        filters: { visible: false },
        pageNavigation: { visible: true }
      }
    }
  };

  const container = document.getElementById("reportContainer");
  const report = powerbi.embed(container, embedConfiguration);
};

embedReport();
</script>
