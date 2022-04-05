import styled from 'styled-components'

const c_container = "transparent";
const c_emotes_container = "transparent";
const size_container = "60px";
const wave_duration = "8s";

export const EmojiDisplayContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 32px 16px 16px;

  @keyframes waveY {
    from {
      transform: translate3D(0, 0, 0);
    }
    to {
      transform: translate3D(0, 100%, 0);
    }
  }

  @keyframes waveX {
    0% {
      transform: translate3D(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3D(calc(-100vw - ${size_container}), 0, 0);
      opacity: 0;
    }
  }

  @keyframes scaleOut {
    80% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.60);
    }
  }

  & {
    height: calc(${size_container} * 3);
    padding-top: ${size_container};
    box-sizing: border-box;
    background: ${c_container};
    overflow: hidden;
  }

  .live-emotes {
    position: relative;
    height: ${size_container};
    margin: auto;

    background: ${c_emotes_container};

    .live-emote-container {
      width: ${size_container};
      height: ${size_container};
      position: absolute;
      right: -${size_container};
      top: -50%;
      user-select: none;

      animation: waveY 3s infinite;
      animation-direction: alternate;

      .live-emote {
        width: 100%;
        height: 100%;
        animation: waveX ${wave_duration};
        animation-timing-function: ease-in;

        &-content {
          width: 100%;
          height: 100%;
          background: transparent;
          animation: scaleOut ${wave_duration};

          span.emoji {
            font-size: 20px;
          }
        }
      }
    }

    .live-emote-container:nth-child(2) {
      animation-duration: 7s;
      animation-timing-function: cubic-bezier(.17,.67,1,.85);
      .live-emote {
        animation-duration: 11s;
        animation-timing-function: cubic-bezier(.17,.67,1,.85);

        &-content {
          animation-duration: 11s;
        }
      }
    }

    .live-emote-container:nth-child(3) {
      animation-duration: 2s;
      animation-timing-function: cubic-bezier(.65,0,.82,1);
      .live-emote {
        animation-duration: 9s;
        animation-timing-function: cubic-bezier(.65,0,.82,1);

        &-content {
          animation-duration: 9s;
        }
      }
    }

    .live-emote-container:nth-child(4) {
      animation-duration: 6s;
      animation-timing-function: cubic-bezier(.72,.14,.58,.98);
      .live-emote {
        animation-duration: 8s;
        animation-timing-function: cubic-bezier(.72,.14,.58,.98);

        &-content {
          animation-duration: 8s;
        }
      }
    }

    .live-emote-container:nth-child(5) {
      animation-duration: 3s;
      animation-timing-function: cubic-bezier(.17,.31,.58,.98);
      .live-emote {
        animation-duration: 9s;
        animation-timing-function: cubic-bezier(.17,.31,.58,.98);

        &-content {
          animation-duration: 9s;
        }
      }
    }

    .live-emote-container:nth-child(6) {
      animation-duration: 6s;
      animation-timing-function: cubic-bezier(.23,.22,1,.84);
      .live-emote {
        animation-duration: 11s;
        animation-timing-function: cubic-bezier(.23,.22,1,.84);

        &-content {
          animation-duration: 11s;
        }
      }
    }

    .live-emote-container:nth-child(7) {
      animation-duration: 5s;
      animation-timing-function: cubic-bezier(1,.11,.51,.78);
      .live-emote {
        animation-duration: 8s;
        animation-timing-function: cubic-bezier(1,.11,.51,.78);

        &-content {
          animation-duration: 8s;
        }
      }
    }

    .live-emote-container:nth-child(8) {
      animation-duration: 4s;
      animation-timing-function: cubic-bezier(.7,.21,.74,.78);
      .live-emote {
        animation-duration: 9s;
        animation-timing-function: cubic-bezier(.7,.21,.74,.78);

        &-content {
          animation-duration: 9s;
        }
      }
    }

    .live-emote-container:nth-child(9) {
      animation-duration: 6s;
      animation-timing-function: cubic-bezier(.48,.15,.86,.75);
      .live-emote {
        animation-timing-function: cubic-bezier(.48,.15,.86,.75);
      }
    }

    .live-emote-container:nth-child(10) {
      animation-duration: 3s;
      animation-timing-function: cubic-bezier(.76,.2,.47,.85);
      .live-emote {
        animation-duration: 11s;
        animation-timing-function: cubic-bezier(.76,.2,.47,.85);

        &-content {
          animation-duration: 11s;
        }
      }
    }
  }
`;

export default EmojiDisplayContainer