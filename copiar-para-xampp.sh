#!/bin/bash

# Script para copiar Fitness RPG para XAMPP automaticamente
# Funciona no macOS e Linux

clear
echo ""
echo "========================================"
echo "Fitness RPG - Copia para XAMPP"
echo "========================================"
echo ""

# Detectar sistema operacional
if [[ "$OSTYPE" == "darwin"* ]]; then
	# macOS
	XAMPP_PATH="/Applications/XAMPP"
else
	# Linux
	XAMPP_PATH="/opt/lampp"
fi

HTDOCS="$XAMPP_PATH/htdocs"

# Verificar se XAMPP está instalado
if [ ! -d "$XAMPP_PATH" ]; then
	echo "[ERRO] XAMPP não encontrado em: $XAMPP_PATH"
	echo ""
	echo "Por favor, altere a variável XAMPP_PATH neste script com seu caminho de instalação."
	echo ""
	exit 1
fi

# Verificar se htdocs existe
if [ ! -d "$HTDOCS" ]; then
	echo "[ERRO] Diretório htdocs não encontrado em: $HTDOCS"
	echo ""
	exit 1
fi

echo "[OK] XAMPP encontrado em: $XAMPP_PATH"
echo "[OK] htdocs encontrado em: $HTDOCS"
echo ""

# Pedir confirmação do usuário
echo "Opções de instalação:"
echo ""
echo "1 - Copiar para pasta raiz (htdocs) - recomendado para acesso em http://localhost/"
echo "2 - Copiar para pasta fitness-rpg - acesso em http://localhost/fitness-rpg/"
echo "3 - Cancelar"
echo ""

read -p "Escolha uma opção (1, 2 ou 3): " CHOICE

case $CHOICE in
	1)
		DEST="$HTDOCS"
		URL="http://localhost/"
		;;
	2)
		DEST="$HTDOCS/fitness-rpg"
		URL="http://localhost/fitness-rpg/"
		;;
	*)
		echo "Operação cancelada."
		exit 0
		;;
esac

# Criar pasta de destino se não existir
if [ ! -d "$DEST" ]; then
	echo "[INFO] Criando diretório: $DEST"
	sudo mkdir -p "$DEST"
fi

# Copiar arquivos
echo ""
echo "[PROCESSANDO] Copiando arquivos para: $DEST"
echo ""

sudo cp -r apps/web/dist/* "$DEST"/ 2>/dev/null

if [ $? -ne 0 ]; then
	echo "[ERRO] Falha ao copiar arquivos"
	echo ""
	exit 1
fi

echo "[OK] Arquivos copiados com sucesso!"
echo ""
echo "========================================"
echo "Instalação concluída!"
echo "========================================"
echo ""
echo "Configure XAMPP:"
echo "1. Execute: sudo $XAMPP_PATH/bin/xampp start"
echo "   (ou use XAMPP Manager se disponível)"
echo ""
echo "Acesse a aplicação em:"
echo "$URL"
echo ""
echo "Certificar-se de que mod_rewrite está habilitado:"
echo "1. Edite: $XAMPP_PATH/etc/httpd.conf"
echo "2. Procure por '#LoadModule rewrite_module'"
echo "3. Se encontrar, remova o '#' no início da linha"
echo "4. Salve e reinicie Apache"
echo ""
