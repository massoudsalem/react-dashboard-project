import { Tooltip, Typography } from "@mui/material";

const TextContent = ({
    content,
    width = 100,
    warp = false,
    disableTooltip = false,
  }) => (
    <Tooltip
      title={content}
      placement="top"
      disableHoverListener={disableTooltip}
      disableFocusListener={disableTooltip}
      disableTouchListener={disableTooltip}
      disableInteractive={disableTooltip}
    >
      <Typography
        className={`overflow-hidden text-ellipsis ${
          warp ? '' : 'whitespace-nowrap'
        }`}
        variant="body2"
        width={width}
      >
        {content}
      </Typography>
    </Tooltip>
  );

  export default TextContent;