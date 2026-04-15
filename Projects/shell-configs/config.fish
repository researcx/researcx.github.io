# config.fish
function fish_greeting
end

# homebrew
#set -gx PATH /opt/homebrew/bin $PATH

# python3.x on homebrew
# set -gx PATH /opt/homebrew/opt/python@3/bin $PATH

# miniconda
# set -gx PATH /Users/sysadmin/Development/miniconda3/bin /Users/sysadmin/Development/miniconda3/condabin $PATH

# snapd
# set -gx PATH /snap/bin $PATH

set -gx EDITOR /usr/bin/nano

set LC_ALL en_US.UTF-8
set LANG en_US.UTF-8
set LANGUAGE en_US.UTF-8

alias ssh-anon='ssh -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile=/dev/null" -o "IdentitiesOnly=yes" -o "IdentityFile=/dev/null" -o "PubkeyAuthentication=no"'
alias git-tor='git -c http.sslVerify=false -c remote.origin.proxy=socks5h://127.0.0.1:9050'
alias git-i2p='git -c http.sslVerify=false -c remote.origin.proxy=socks5h://127.0.0.1:4444'
alias git-invalidssl='git -c http.sslVerify=false'

alias psg="ps aux | grep"
alias hsg="history | grep"

alias ls='ls -haltr --color=auto'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias findin='egrep -rl'
alias cp='cp -v'
alias rm='rm -v --preserve-root'
alias nano='nano -w'

# MacOS
#alias unixtime='date +%s'
#alias unixfilename='echo "(date '+%s')""(jot -r 1 100 999)"'
#alias unixtimetodate='date -j -f %s'
#alias bmt='set _BTV (date '+%s'); echo "($_BTV+3600)%86400/86.4" | bc'

# Linux
alias unixtime='date +%s'
alias unixfilename='echo (date '+%s')(seq -w 0 999 | shuf)[1]'
function unixtimetodate
    date -d @$argv
end
alias bmt='set _BTV (date '+%s'); echo "($_BTV+3600)%86400/86.4" | bc'

alias tl='tmux ls' # list sessions
alias ta='tmux attach' # attach
alias tad='tmux attach -d' # attach and detatch existing clients
alias tat='tmux a -t' # tat <session> # attach to named session
alias tan='tmux new -s' # tan <session> # create new named session
alias tkill='tmux kill-session -t' # tkill <session> # kill a named session

alias ga='git add'
alias gp='git push'
alias gl='git log'
alias gs='git status'
alias gd='git diff'
alias gdc='git diff --cached'
alias gm='git commit -m'
alias gma='git commit -am'
alias gb='git branch'
alias gc='git checkout'
alias gra='git remote add'
alias grr='git remote rm'
alias gpu='git pull'
alias gcl='git clone'

# Proxmox
alias shell="pct enter"
function shell-tmux
    pct exec $argv -- bash -c 'tmux'
end
function shell-tmux-attach
    pct exec $argv -- bash -c 'tmux attach'
end
alias containers="pct list | grep running; pct list | grep stopped"

# systemd
function start
    service $argv start
end
function restart
    service $argv restart
end
function stop
    service $argv stop
end
alias jctl='journalctl -xe'
alias state='systemctl status'
alias enable='systemctl enable --now'
alias disable='systemctl disable --now'

# openrc
#function start
#    rc-service $argv start
#end
#function restart
#    rc-service $argv restart
#end
#function stop
#    rc-service $argv stop
#end
#function state
#    rc-service $argv state
#end
#alias jctl='tail -n 2000 /var/log/messages'
#function enable
#    rc-update add $argv
#end
#function disable
#    rc-update del $argv
#end

# brew services
#function start
#    brew services start $argv
#end
#function restart
#    brew services restart $argv
#end
#function stop
#    brew services stop $argv
#end

# iptables
#alias tor-on='/usr/sbin/iptables-restore /etc/iptables/rules.v4; /usr/bin/sh /etc/iptables/tor.v4.sh'
#alias tor-off='/usr/sbin/iptables-restore /etc/iptables/rules.v4'

function prompt_login --description "display user name for the prompt"
    set -l textfg black
    set -l textbg green
    if not set -q __fish_machine
        set -g __fish_machine
        set -l debian_chroot $debian_chroot

        if test -r /etc/debian_chroot
            set debian_chroot (cat /etc/debian_chroot)
        end

        if set -q debian_chroot[1]
            and test -n "$debian_chroot"
            set -g __fish_machine "(chroot:$debian_chroot)"
        end
    end

    # Prepend the chroot environment if present
    if set -q __fish_machine[1]
        echo -n -s (set_color yellow) "$__fish_machine" (set_color normal) ' '
    end

    # If we're running via SSH, change the host color.
    set -l color_host $fish_color_host
    if set -q SSH_TTY; and set -q fish_color_host_remote
        set color_host $fish_color_host_remote
    end
    set_color $textfg -b $textbg
    echo -n [(prompt_hostname)]
    set_color normal -b normal
    echo -n " "
    echo -n -s (set_color $fish_color_user) "$USER" (set_color normal)
end