/// <reference types="astro/client" />

import type { KVNamespace } from "@cloudflare/workers-types";

type ENV = {
  BLOG_VIEWS: KVNamespace;
};

declare global {
  namespace App {
    interface Locals {
      runtime: {
        env: ENV;
      };
    }
  }
}
