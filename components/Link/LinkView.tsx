import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CaptionUppercase } from 'components/GlobalStyles'
import LinkStyles from 'components/Link/Link.style'
import React from 'react'

type LinkViewProps = {
  title: string;
  subtitle?: string | React.ReactElement;
  image?: any;
  caption?: string | React.ReactElement;
  icon: IconDefinition;
  color: string;
  href?: string;
  openInNewTab?: boolean;
  onClick?: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({
  title,
  subtitle,
  image,
  caption,
  icon,
  color,
  href,
  openInNewTab = true,
  onClick = () => {}
}) => {

  let className = !subtitle ? "center" : ""

  if (href) {
    return (
      <LinkStyles.Link href={href} onClick={onClick} target={openInNewTab ? "_blank" : null} className={className}>
        <FontAwesomeIcon icon={icon} color={color} size={"lg"} />
        <LinkStyles.Content>
          <p>{title}</p>
          {caption && <CaptionUppercase className={"caption"}>{caption}</CaptionUppercase>}
          {subtitle && <span>{subtitle}</span>}
          {image && <img src={image} alt={title} />}
        </LinkStyles.Content>
      </LinkStyles.Link>
    )
  }

  return (
    <LinkStyles.Container onClick={onClick} className={className}>
      <FontAwesomeIcon icon={icon} color={color} size={"lg"} />
      <LinkStyles.Content>
        <p>{title}</p>
        {caption && <CaptionUppercase className={"caption"}>{caption}</CaptionUppercase>}
        {subtitle && <span>{subtitle}</span>}
        {image && <img src={image} alt={title} />}
      </LinkStyles.Content>
    </LinkStyles.Container>
  )
}

export default LinkView;