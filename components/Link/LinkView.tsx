import React, { useState } from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import LinkReactions from 'components/Link/LinkReactions'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinkStyles from 'components/Link/Link.style'

type LinkViewProps = {
  title: string;
  subtitle?: string | React.ReactElement;
  image?: any;
  contentImage?: any;
  caption?: string | React.ReactElement;
  icon?: IconDefinition;
  color: string;
  href?: string;
  openInNewTab?: boolean;
  onClick?: () => void;
  light?: boolean;
  reactions?: boolean;
}

const LinkView: React.FC<LinkViewProps> = ({
  title,
  subtitle,
  image,
  contentImage,
  caption,
  icon = null,
  color,
  href,
  openInNewTab = true,
  onClick = () => {},
  light = false,
  reactions = false,
}) => {

  const [emojis, setEmojis] = useState()

  let className = [
    "link-prev",
    !subtitle ? "center" : "",
    light ? "light" : "",
    (!onClick && !href) ? "noclick" : ""
  ].filter(x => x.length > 0).join(" ");

  if (href) {
    return (
      <LinkStyles.Layout>
        <LinkStyles.Link href={href} onClick={onClick} target={openInNewTab ? "_blank" : null} className={className}>
          {icon && <FontAwesomeIcon icon={icon} color={color} className={'icon'} />}
          {image && <img className={"icon"} src={image} alt={title} />}
          <LinkStyles.Content>
            {caption && <span className={"caption"}>{caption}</span>}
            <p className={"title"}>{title}</p>
            {subtitle && <span className={"content"}>{subtitle}</span>}
            {contentImage && <img className={'content'} src={contentImage} alt={title} />}
          </LinkStyles.Content>
          <FontAwesomeIcon icon={faChevronRight} />
        </LinkStyles.Link>
        {reactions && <LinkReactions />}
      </LinkStyles.Layout>
    )
  }

  return (
    <LinkStyles.Container onClick={onClick} className={className}>
      <LinkStyles.Layout>
        {icon && <FontAwesomeIcon icon={icon} color={color} className={'icon'} />}
        {image && <img className={"icon"} src={image} alt={title} />}
        <LinkStyles.Content>
          {caption && <span className={"caption"}>{caption}</span>}
          <p className={"title"}>{title}</p>
          {subtitle && <span className={"content"}>{subtitle}</span>}
          {contentImage && <img className={'content'} src={contentImage} alt={title} />}
        </LinkStyles.Content>
        {/*<FontAwesomeIcon icon={faChevronRight} />*/}
      </LinkStyles.Layout>
      {reactions && <LinkReactions />}
    </LinkStyles.Container>
  )
}

export default LinkView;