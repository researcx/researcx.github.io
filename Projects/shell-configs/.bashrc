if [[ $- =~ i ]] && [[ -z "$TMUX" ]] && [[ -n "$SSH_TTY" ]]; then
    tmux attach-session -t ssh || tmux new-session -s ssh
fi

[ -z "$PS1" ] && return
if [ "$TMUX" ]; then
    echo ""
    neofetch
fi
if command -v "fish" &> /dev/null
then
    fish
fi
