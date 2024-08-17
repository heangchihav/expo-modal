// src/components/Modal.tsx
import React, { useState, useEffect } from 'react';
import { View, Modal, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalComponent({ visible, onClose }: ModalComponentProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const updateImageDimensions = () => {
      const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
      const maxModalWidth = 800; // Set a maximum width for the modal
      const maxModalHeight = 600; // Set a maximum height for the modal

      // Fetch image dimensions
      Image.getSize('https://i.imgur.com/eMNYPIk.png', (width, height) => {
        const aspectRatio = width / height;
        let modalWidth = Math.min(screenWidth * 0.9, width, maxModalWidth); // Max width is 90% of screen width, image width, or maxModalWidth
        let modalHeight = modalWidth / aspectRatio;

        if (modalHeight > screenHeight * 0.9) {
          modalHeight = Math.min(screenHeight * 0.9, height, maxModalHeight); // Max height is 90% of screen height, image height, or maxModalHeight
          modalWidth = modalHeight * aspectRatio;
        }

        setImageDimensions({ width: modalWidth, height: modalHeight });
      });
    };

    updateImageDimensions();
    const subscription = Dimensions.addEventListener('change', updateImageDimensions);

    return () => {
      subscription?.remove();
    };
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width: imageDimensions.width, height: imageDimensions.height }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://i.imgur.com/eMNYPIk.png' }}
            style={styles.modalImage}
            resizeMode="contain" // Ensures the image scales properly while maintaining aspect ratio
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker background for better contrast
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10, // Adds shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    position: 'relative', // Allows positioning of the close button
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background
    borderRadius: 15, // Rounded button
    padding: 5,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
