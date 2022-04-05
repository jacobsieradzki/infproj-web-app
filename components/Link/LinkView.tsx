import LinkReactions from 'components/Link/LinkReactions'
import React, { useState } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CaptionUppercase } from 'components/GlobalStyles'
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
}) => {

  const [emojis, setEmojis] = useState()

  let className = [
    "link-prev",
    !subtitle ? "center" : "",
    light ? "light" : "",
    (!onClick && !href) ? "noclick" : ""
  ].filter(x => x.length > 0).join(" ")

  if (href) {
    return (
      <LinkStyles.Layout>
        <LinkStyles.Link href={href} onClick={onClick} target={openInNewTab ? "_blank" : null} className={className}>
          {icon && <FontAwesomeIcon icon={icon} color={color} className={'icon'} />}
          {image && <img className={"icon"} src={image} alt={title} />}
          <LinkStyles.Content>
            <p className={"title"}>{title}</p>
            {caption && <CaptionUppercase className={"caption"}>{caption}</CaptionUppercase>}
            {subtitle && <span className={"content"}>{subtitle}</span>}
            {contentImage && <img className={'content'} src={contentImage} alt={title} />}
          </LinkStyles.Content>
        </LinkStyles.Link>
        <LinkReactions />
      </LinkStyles.Layout>
    )
  }

  return (
    <LinkStyles.Container onClick={onClick} className={className}>
      <LinkStyles.Layout>
        {icon && <FontAwesomeIcon icon={icon} color={color} className={'icon'} />}
        {image && <img className={"icon"} src={image} alt={title} />}
        <LinkStyles.Content>
          <p className={"title"}>{title}</p>
          {caption && <CaptionUppercase className={"caption"}>{caption}</CaptionUppercase>}
          {subtitle && <span className={"content"}>{subtitle}</span>}
          {contentImage && <img className={'content'} src={contentImage} alt={title} />}
        </LinkStyles.Content>
      </LinkStyles.Layout>
      <LinkReactions />
    </LinkStyles.Container>
  )
}

export default LinkView;