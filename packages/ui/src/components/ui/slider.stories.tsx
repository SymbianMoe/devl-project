import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';
import * as React from 'react';
import { Label } from './label';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'The minimum value',
    },
    max: {
      control: 'number',
      description: 'The maximum value',
    },
    step: {
      control: 'number',
      description: 'The step increment',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the slider',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="w-80">
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

export const WithValueDisplay: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <Label>Volume</Label>
          <span className="text-sm text-muted-foreground font-medium">
            {value[0]}%
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = React.useState([25, 75]);
    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground font-medium">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          minStepsBetweenThumbs={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>
    );
  },
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <Label>Step Increment (10)</Label>
          <span className="text-sm text-muted-foreground font-medium">
            {value[0]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={10}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
          <span>60</span>
          <span>70</span>
          <span>80</span>
          <span>90</span>
          <span>100</span>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value] = React.useState([50]);
    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-muted-foreground">Disabled Slider</Label>
          <span className="text-sm text-muted-foreground font-medium">
            {value[0]}%
          </span>
        </div>
        <Slider
          value={value}
          max={100}
          step={1}
          disabled
        />
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="flex gap-8 items-center h-80">
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm text-muted-foreground font-medium">
            {value[0]}%
          </span>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            orientation="vertical"
            className="h-64"
          />
          <Label>Volume</Label>
        </div>
      </div>
    );
  },
};

export const MultipleControls: Story = {
  render: () => {
    const [volume, setVolume] = React.useState([60]);
    const [brightness, setBrightness] = React.useState([70]);
    const [contrast, setContrast] = React.useState([40]);

    return (
      <div className="w-96 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Volume</Label>
            <span className="text-sm text-muted-foreground font-medium">
              {volume[0]}%
            </span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Brightness</Label>
            <span className="text-sm text-muted-foreground font-medium">
              {brightness[0]}%
            </span>
          </div>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Contrast</Label>
            <span className="text-sm text-muted-foreground font-medium">
              {contrast[0]}%
            </span>
          </div>
          <Slider
            value={contrast}
            onValueChange={setContrast}
            max={100}
            step={1}
          />
        </div>
      </div>
    );
  },
};

export const CustomMinMax: Story = {
  render: () => {
    const [value, setValue] = React.useState([0]);
    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <Label>Temperature</Label>
          <span className="text-sm text-muted-foreground font-medium">
            {value[0]}°C
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={-20}
          max={40}
          step={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-20°C</span>
          <span>0°C</span>
          <span>40°C</span>
        </div>
      </div>
    );
  },
};

export const FineControl: Story = {
  render: () => {
    const [value, setValue] = React.useState([0.5]);
    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <Label>Precision Control</Label>
          <span className="text-sm text-muted-foreground font-medium">
            {value[0].toFixed(2)}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={1}
          step={0.01}
        />
        <p className="text-xs text-muted-foreground">
          Fine-grained control with 0.01 increments
        </p>
      </div>
    );
  },
};
