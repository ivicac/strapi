import React, { useMemo } from 'react';
import { Flex, Text } from '@buffetjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PermissionsWrapper, RowContainer } from 'strapi-helper-plugin';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
// import SubCategory from 'ee_else_ce/components/Roles/Permissions/PluginsAndSettingsPermissions/PermissionRow/SubCategory';
import SubCategory from '../SubCategory';
import RowStyle from './Wrapper';

const PermissionRow = ({ childrenForm, kind, name, isOpen, isWhite, onOpenCategory }) => {
  const { formatMessage } = useIntl();

  const handleClick = () => {
    onOpenCategory(name);
  };

  const categoryName = useMemo(() => {
    const split = name.split('::');

    return split[split.length - 1];
  }, [name]);

  return (
    <RowContainer isWhite={isWhite}>
      <RowStyle
        isWhite={isWhite}
        isActive={isOpen}
        // key={permissions.category}
        onClick={handleClick}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <div>
            <Text color="grey" fontWeight="bold" fontSize="xs" textTransform="uppercase">
              {categoryName}
            </Text>
            <Text lineHeight="22px" color="grey">
              {formatMessage({ id: 'Settings.permissions.category' }, { category: categoryName })}
              &nbsp;{kind === 'plugins' ? 'plugin' : kind}
            </Text>
          </div>
          <div>
            <FontAwesomeIcon style={{ width: '11px' }} color="#9EA7B8" icon="chevron-down" />
          </div>
        </Flex>
      </RowStyle>

      {isOpen && (
        <PermissionsWrapper isWhite={isWhite}>
          {childrenForm.map(({ actions, subCategoryName }) => (
            <SubCategory categoryName={subCategoryName} key={subCategoryName} actions={actions} />
          ))}
        </PermissionsWrapper>
      )}
    </RowContainer>
  );
};

PermissionRow.defaultProps = {};

PermissionRow.propTypes = {
  childrenForm: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isWhite: PropTypes.bool.isRequired,
  kind: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onOpenCategory: PropTypes.func.isRequired,
};

export default PermissionRow;
