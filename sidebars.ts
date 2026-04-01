import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Campaigns",
      items: [
        "campaigns/what are campaigns",
        "campaigns/auto_accept",
        "campaigns/connector_campaign",
        "campaigns/flow",
        "campaigns/in_mail",
        "campaigns/messenger_campaign",
        "campaigns/monitoring_campaigns",
        "campaigns/schedule_post",
        "campaigns/campaign_steps",
      ],
    },
    {
      type: "category",
      label: "Contacts",
      items: ["contacts/import_contacts", "contacts/export_contacts"],
    },
    {
      type: "category",
      label: "Integration",
      items: [
        "integration/supported",
        "integration/webhook",
        "integration/metrics",
      ],
    },
    {
      type: "category",
      label: "Managing your Account",
      items: [
        "managing_your_account/how_to_add_a_profile",
        "managing_your_account/profile_limits_exceeded",
      ],
    },
    {
      type: "category",
      label: "Using Sonity",
      items: [
        "using_sonity/effective_automation",
        "using_sonity/turning_off_browser",
        "using_sonity/using_proxies",
      ],
    },
  ],
};

export default sidebars;
