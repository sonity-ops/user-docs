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
      label: "Getting Started",
      link: {
        type: "generated-index",
        slug: "/category/getting_started",
      },
      items: [
        "getting_started/getting_started",
        "getting_started/setting_up_2fa",
        "getting_started/adding_profile",
        "getting_started/running_your_first_campaign",
      ],
    },
    {
      type: "category",
      label: "Campaigns",
      link: {
        type: "generated-index",
        slug: "/category/campaigns",
      },
      items: [
        "campaigns/what are campaigns",
        "campaigns/campaign_lifecycle",
        "campaigns/which_campaign_type",
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
      link: {
        type: "generated-index",
        slug: "/category/contacts",
      },
      items: ["contacts/import_contacts", "contacts/export_contacts"],
    },
    {
      type: "category",
      label: "Integration",
      link: {
        type: "generated-index",
        slug: "/category/integration",
      },
      items: [
        "integration/supported",
        "integration/webhook",
        "integration/metrics",
      ],
    },
    {
      type: "category",
      label: "Using AI",
      link: {
        type: "generated-index",
        slug: "/category/using-ai",
      },
      items: [
        "using-ai/introduction",
        "using-ai/generating_steps",
        "using-ai/generating_posts",
        "using-ai/ai_errors",
      ],
    },
    {
      type: "category",
      label: "MCP",
      link: {
        type: "generated-index",
        slug: "/category/mcp",
      },
      items: [
        "mcp/introduction",
        "mcp/authentication",
        "mcp/connecting",
        "mcp/tools",
        "mcp/troubleshooting",
      ],
    },
    {
      type: "category",
      label: "Managing your Account",
      link: {
        type: "generated-index",
        slug: "/category/managing-your-account",
      },
      items: [
        "managing_your_account/how_to_add_a_profile",
        "managing_your_account/profile_limits_exceeded",
      ],
    },
    {
      type: "category",
      label: "Using Sonity",
      link: {
        type: "generated-index",
        slug: "/category/using-sonity",
      },
      items: [
        "using_sonity/effective_automation",
        "using_sonity/turning_off_browser",
        "using_sonity/using_proxies",
        "using_sonity/common_errors",
        "using_sonity/linkedin_limits",
        "using_sonity/analytics_guide",
        "using_sonity/personalization_variables",
        "using_sonity/faq_troubleshooting",
      ],
    },
  ],
};

export default sidebars;
