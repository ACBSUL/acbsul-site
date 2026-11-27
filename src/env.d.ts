/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** usuário logado no admin (preenchido pelo middleware em /admin/*),
     *  já com papel, permissões e status — ver src/lib/usuarios.ts */
    user?: import('./lib/usuarios').Usuario | null;
  }
}
