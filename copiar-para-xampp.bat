@echo off
REM Script para copiar Fitness RPG para XAMPP automaticamente
REM Funciona no Windows

setlocal enabledelayedexpansion

REM Cores e mensagens
cls
echo.
echo ========================================
echo Fitness RPG - Copia para XAMPP
echo ========================================
echo.

REM Verificar se XAMPP está instalado
set "XAMPP_PATH=C:\xampp"

if not exist "%XAMPP_PATH%" (
	echo [ERRO] XAMPP nao encontrado em: %XAMPP_PATH%
	echo.
	echo Por favor, altere a variavel XAMPP_PATH neste script com seu caminho de instalacao.
	echo Exemplo: set "XAMPP_PATH=C:\xampp" ou set "XAMPP_PATH=D:\xampp"
	echo.
	pause
	exit /b 1
)

set "HTDOCS=%XAMPP_PATH%\htdocs"

REM Verificar se htdocs existe
if not exist "%HTDOCS%" (
	echo [ERRO] Diretorio htdocs nao encontrado em: %HTDOCS%
	echo.
	pause
	exit /b 1
)

echo [OK] XAMPP encontrado em: %XAMPP_PATH%
echo [OK] htdocs encontrado em: %HTDOCS%
echo.

REM Pedir confirmacao do usuario
echo Opcoes de instalacao:
echo.
echo 1 - Copiar para pasta raiz (htdocs) - recomendado para acesso em http://localhost/
echo 2 - Copiar para pasta fitness-rpg - acesso em http://localhost/fitness-rpg/
echo 3 - Cancelar
echo.

set /p CHOICE="Escolha uma opcao (1, 2 ou 3): "

if "%CHOICE%"=="1" (
	set "DEST=%HTDOCS%"
	set "URL=http://localhost/"
) else if "%CHOICE%"=="2" (
	set "DEST=%HTDOCS%\fitness-rpg"
	set "URL=http://localhost/fitness-rpg/"
) else (
	echo Operacao cancelada.
	pause
	exit /b 0
)

REM Criar pasta de destino se nao existir
if not exist "%DEST%" (
	echo [INFO] Criando diretorio: %DEST%
	mkdir "%DEST%"
)

REM Copiar arquivos
echo.
echo [PROCESSANDO] Copiando arquivos para: %DEST%
echo.

xcopy /E /Y /I "apps\web\dist\*" "%DEST%\" >nul 2>&1

if errorlevel 1 (
	echo [ERRO] Falha ao copiar arquivos
	echo.
	pause
	exit /b 1
)

echo [OK] Arquivos copiados com sucesso!
echo.
echo ========================================
echo Instalacao concluida!
echo ========================================
echo.
echo Configure XAMPP:
echo 1. Abra XAMPP Control Panel
echo 2. Clique em START para Apache
echo.
echo Acesse a aplicacao em:
echo %URL%
echo.
echo Certificar-se de que mod_rewrite esta habilitado:
echo 1. Clique em CONFIG em XAMPP Control Panel
echo 2. Apache (httpd.conf)
echo 3. Procure por "#LoadModule rewrite_module"
echo 4. Se encontrar, remova o "#" no comeco da linha
echo 5. Salve e reinicie Apache
echo.
pause
