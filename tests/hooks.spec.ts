
import {test} from '@playwright/test';

test.beforeEach(async({}, testInfo) => {
   
    if(testInfo.title === 'Criar usuário com dados válidos'){
         console.log('CRIANDO USUARIO\n');
    }
});

test.afterEach(async({},testInfo)=>{
    if(testInfo.title === 'Criar usuário com dados válidos'){
        console.log('EXCLUINDO USÁRIO\n');
    }
    
}); 


test('Criar usuário com dados válidos', async()=>{

    const name: String = 'Maria Silva';
    const email: String = 'maria.test@example.com';
    const password: String = 'Senhateste123';

    console.log('Cadastro de Usuário com dados válidos!')
    console.log(`Nome: ${name}, E-mail: ${email}, Senha: ${password}\n`)
    
})

test('Cadastro com usuario vazio', async()=>{

    const name: String = '';
    const email: String = 'maria.test@example.com';
    const password: String = 'Senhateste123';

    console.log('Cadastro com usuário Vazio')
    console.log(`Nome: ${name}, E-mail: ${email}, Senha: ${password}\n`)
    
})