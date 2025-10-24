import { NextResponse } from 'next/server'

// Em uma aplicação real, você usaria um serviço de e-mail como Resend, SendGrid, ou Nodemailer.
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validação simples dos campos
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nome, e-mail e mensagem são obrigatórios.' }, { status: 400 })
    }

    // TODO: Implementar o envio de e-mail aqui.
    // Por enquanto, vamos apenas logar os dados no console do servidor.
    console.log('Nova mensagem recebida:')
    console.log({ name, email, subject, message })

    /* Exemplo com Resend:
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contato@fromstars3d.com',
      subject: `Nova mensagem de ${name}: ${subject}`,
      text: `De: ${email}\n\nMensagem:\n${message}`,
    });
    */

    return NextResponse.json({ message: 'Mensagem enviada com sucesso!' })
  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error)
    return NextResponse.json({ error: 'Ocorreu um erro ao enviar a mensagem.' }, { status: 500 })
  }
}