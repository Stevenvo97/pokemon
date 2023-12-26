import { Text, Chip } from "@mantine/core";
import { StyledContainer, StyledWrappedChip } from "./index.styled";

export type Type = {
  name: string;
  url: string;
};
export type Props = {
  types?: Type[];
  valueType: string[];
  setValue: (value: string[]) => void;
};

const TypeFilter = ({ types, valueType, setValue }: Props) => {
  return (
    <StyledContainer>
      <Text fw={700}>Types:</Text>
      <StyledWrappedChip>
      <Chip.Group multiple value={valueType} onChange={setValue}>
        {types?.length ?
          types.map((type, idx) => (
            <Chip key={`${type.name}-${idx}`} value={type.name} size="md" radius="md">
              {type.name}
            </Chip>
          )): <Text size="sm">Loading...</Text>}
      </Chip.Group>
      </StyledWrappedChip>
    </StyledContainer>
  );
};

export { TypeFilter };
