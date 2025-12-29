"use client";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function AlertOnEnter() {
  useEffect(() => {
    Swal.fire({
      title: "Aviso",
      icon: "warning",
      html: `
        <div style="text-align:left; line-height:1.35">
          <b>Tipo:</b> Portfólio / Demonstração<br>
          <b>Dados reais:</b> Não informe (use dados fictícios)<br>
          <b>Evite:</b> e-mail principal, telefone, endereço, senhas reutilizadas<br>
          <b>Cadastro:</b> Apenas para testes<br>
          <b>Backend:</b> Hospedado em plano gratuito<br>
          <b>Desempenho:</b> A 1ª requisição pode demorar até 30 segundos devido ao plano gratuito que backend esta hospedado; as demais podem ter leve lentidão<br>
        </div>
      `,
      confirmButtonText: "OK",
      allowOutsideClick: false,
    });
  }, []);

  return null;
}
