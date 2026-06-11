/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** usuário logado no admin (preenchido pelo middleware em /admin/*) */
    user?: {
      id: string;
      name: string;
      email: string;
    } | null;
  }
}
